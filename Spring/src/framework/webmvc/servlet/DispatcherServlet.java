package framework.webmvc.servlet;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import framework.annotation.Autowired;
import framework.annotation.Controller;
import framework.annotation.RequestMapping;
import framework.annotation.RequestParam;
import framework.annotation.Service;

public class DispatcherServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private Properties contextConfig = new Properties();

	private List<String> classNames = new ArrayList<>();

	private Map<String, Object> ioc = new HashMap<>();

	private List<Handler> handlerMapping = new ArrayList<>();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// �ȴ�����
		try {
			doDispatch(req, resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resp.getWriter().write("500 Exception");
		}
	}

	private void doDispatch(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		Handler handler=getHandler(req);
		if(handler==null) {
			//���û��ƥ���ϣ�����404
			resp.getWriter().write("404 Not Found");
			return ;
		}
		//��ȡ�����б�
		Class<?> []paramTypes=handler.method.getParameterTypes();
		//����������Ҫ�Զ���ֵ�Ĳ���ֵ
		Object []paramValues=new Object[paramTypes.length];
		
		Map<String,String[]> params=req.getParameterMap();
		for(Map.Entry<String, String[]> param:params.entrySet()) {
			String value=Arrays.toString(param.getValue()).replaceAll("\\[|\\]", "").replaceAll("/+", "/");
			System.out.println(value);
			//����ҵ�ƥ��Ķ��󣬾Ϳ�ʼ���ֵ
			if(!handler.paramIndexMapping.containsKey(param.getKey())) {
				continue;
			}
			int index=handler.paramIndexMapping.get(param.getKey());
			paramValues[index]=convert(paramTypes[index],value);
		}
		//���÷����е�request��response����
		int reqIndex=handler.paramIndexMapping.get(HttpServletRequest.class.getName());
		paramValues[reqIndex]=req;
		int respIndex=handler.paramIndexMapping.get(HttpServletResponse.class.getName());
		paramValues[respIndex]=resp;
		
	handler.method.invoke(handler.controller, paramValues);
	}

	private Object convert(Class<?> type, String value) {
		if(Integer.class==type) {
			return Integer.valueOf(value);
		}
		return value;
	}

	private Handler getHandler(HttpServletRequest req) {
		if(handlerMapping.isEmpty()) {
			return null;
		}
		String url=req.getRequestURI();
		String contextPath=req.getContextPath();
		url=url.replace(contextPath, "").replaceAll("/+", "/");
		for(Handler handler:handlerMapping) {
			Matcher matcher=handler.pattern.matcher(url);
			if(!matcher.matches()) {
				continue;
			}
			return handler;
		}
		return null;
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		// �����￪ʼ����

		// ���������ļ�
		doLoadConfig(config.getInitParameter("contextConfigLocation"));
		// ɨ�����������
		doScanner(contextConfig.getProperty("scanPackage"));
		// ��ʼ��������ص���
		try {
			doInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// �Զ�ע��
		doAutowired();
		// ��ʼ��HandlerMapping������mvc�ġ�
		initHandlerMapping();

		System.out.println("Spring init...");
	}

	private void initHandlerMapping() {
		if (ioc.isEmpty()) {
			return;
		}
		for (Map.Entry<String, Object> entry : ioc.entrySet()) {
			Class<?> clazz = entry.getValue().getClass();
			if (!clazz.isAnnotationPresent(Controller.class)) {
				continue;
			}
			String baseUrl = "";
			if (clazz.isAnnotationPresent(RequestMapping.class)) {
				RequestMapping requestMapping = clazz.getAnnotation(RequestMapping.class);
				baseUrl = requestMapping.value();
			}

			// ɨ�����еĹ�������
			for (Method method : clazz.getMethods()) {
				if (!method.isAnnotationPresent(RequestMapping.class)) {
					continue;
				}
				RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
				String regex = ("/" + baseUrl + requestMapping.value()).replaceAll("/+", "/");
				Pattern e = Pattern.compile(regex);
				handlerMapping.add(new Handler(entry.getValue(), method, e));
				System.out.println("Mapping:" + regex + "." + method);
			}
		}

	}

	private void doAutowired() {
		if (ioc.isEmpty()) {
			return;
		}
		// ѭ�����е��࣬����Ҫ�Զ���ֵ�����Խ��и�ֵ
		for (Map.Entry<String, Object> entry : ioc.entrySet()) {
			Field[] fields = entry.getValue().getClass().getDeclaredFields();
			for (Field field : fields) {
				if (!field.isAnnotationPresent(Autowired.class)) {
					continue;
				}
				Autowired autowired = field.getAnnotation(Autowired.class);
				String beanName = autowired.value().trim();
				if ("".equals(beanName)) {
					beanName = field.getType().getName();
				}
				field.setAccessible(true);
				try {
					field.set(entry.getValue(), ioc.get(beanName));
				} catch (Exception e) {
					e.printStackTrace();
					continue;
				}
			}
		}
	}

	private void doInstance() throws Exception {
		if (classNames.isEmpty()) {
			return;
		}
		for (String classname : classNames) {
			Class<?> clazz = Class.forName(classname);
			// �������е��඼Ҫʵ������ֻ�ϼ���ע���
			if (clazz.isAnnotationPresent(Controller.class)) {
				String name = clazz.getName().toLowerCase();
				System.out.println(name);
				ioc.put(name, clazz.newInstance());
			} else if (clazz.isAnnotationPresent(Service.class)) {

				// 1.����Զ��������֣�����ʹ���Զ�������
				Service service = clazz.getAnnotation(Service.class);
				String beanName = service.value();
				// 2.Ĭ�ϲ�������ĸСд
				if ("".equals(beanName.trim())) {
					beanName = clazz.getName().toLowerCase();
				}
				Object instance = clazz.newInstance();
				ioc.put(beanName, instance);
				// 3.���ݽӿ���������ֵ
				for (Class<?> i : clazz.getInterfaces()) {
					ioc.put(i.getName(), instance);
				}
			} else {
				continue;
			}
		}
	}

	private void doScanner(String scanPackage) {
		URL url = this.getClass().getClassLoader().getResource("/" + scanPackage.replaceAll("\\.", "/"));
		File classDir = new File(url.getFile());
		for (File file : classDir.listFiles()) {
			if (file.isDirectory()) {
				doScanner(scanPackage + "." + file.getName());
			} else {
				String className = scanPackage + "." + file.getName().replace(".class", "");
				System.out.println(className);
				classNames.add(className);
			}
		}
	}

	private void doLoadConfig(String contextConfigLocation) {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream(contextConfigLocation);

		try {
			contextConfig.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != is) {
				try {
					is.close();
				} catch (Exception e2) {
					e2.printStackTrace();
				}
			}
		}
	}

	private class Handler {
		protected Object controller; // ���淽����Ӧ��ʾ��
		protected Method method; // ����ӳ��ķ���
		protected Pattern pattern;
		protected Map<String, Integer> paramIndexMapping; // ����˳��
		/*
		 * ���췽��
		 */

		public Handler(Object controller, Method method, Pattern pattern) {
			super();
			this.controller = controller;
			this.method = method;
			this.pattern = pattern;
			paramIndexMapping = new HashMap<String, Integer>();
			putParamIndexMapping(method);
		}

		private void putParamIndexMapping(Method method) {
			// ��ȡ�����м���ע��Ĳ���
			Annotation[][] pa = method.getParameterAnnotations();
			for (int i = 0; i < pa.length; i++) {
				for (Annotation a : pa[i]) {
					if (a instanceof RequestParam) {
						String paramName = ((RequestParam) a).value();
						if (!"".equals(paramName.trim())) {
							paramIndexMapping.put(paramName, i);
						}
					}
				}
			}
			// ��ȡ�����е�request��response����
			Class<?>[] paramTypes = method.getParameterTypes();
			for (int i = 0; i < paramTypes.length; i++) {
				Class<?> type = paramTypes[i];
				if (type == HttpServletRequest.class || type == HttpServletResponse.class) {
					paramIndexMapping.put(type.getName(), i);
				}
			}
		}
	}
}
