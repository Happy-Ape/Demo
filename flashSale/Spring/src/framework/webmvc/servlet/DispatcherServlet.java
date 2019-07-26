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
		// 等待请求
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
			//如果没有匹配上，返回404
			resp.getWriter().write("404 Not Found");
			return ;
		}
		//获取参数列表
		Class<?> []paramTypes=handler.method.getParameterTypes();
		//保存所有需要自动赋值的参数值
		Object []paramValues=new Object[paramTypes.length];
		
		Map<String,String[]> params=req.getParameterMap();
		for(Map.Entry<String, String[]> param:params.entrySet()) {
			String value=Arrays.toString(param.getValue()).replaceAll("\\[|\\]", "").replaceAll("/+", "/");
			System.out.println(value);
			//如果找到匹配的对象，就开始填充值
			if(!handler.paramIndexMapping.containsKey(param.getKey())) {
				continue;
			}
			int index=handler.paramIndexMapping.get(param.getKey());
			paramValues[index]=convert(paramTypes[index],value);
		}
		//设置方法中的request和response对象
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
		// 从这里开始启动

		// 加载配置文件
		doLoadConfig(config.getInitParameter("contextConfigLocation"));
		// 扫描所有相关类
		doScanner(contextConfig.getProperty("scanPackage"));
		// 初始化所有相关的类
		try {
			doInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 自动注入
		doAutowired();
		// 初始化HandlerMapping，属于mvc的。
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

			// 扫描所有的公共方法
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
		// 循环所有的类，对需要自动赋值的属性进行赋值
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
			// 不是所有的类都要实例化。只认加了注解的
			if (clazz.isAnnotationPresent(Controller.class)) {
				String name = clazz.getName().toLowerCase();
				System.out.println(name);
				ioc.put(name, clazz.newInstance());
			} else if (clazz.isAnnotationPresent(Service.class)) {

				// 1.如果自定义了名字，优先使用自定义名字
				Service service = clazz.getAnnotation(Service.class);
				String beanName = service.value();
				// 2.默认采用首字母小写
				if ("".equals(beanName.trim())) {
					beanName = clazz.getName().toLowerCase();
				}
				Object instance = clazz.newInstance();
				ioc.put(beanName, instance);
				// 3.根据接口类型来赋值
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
		protected Object controller; // 保存方法对应的示例
		protected Method method; // 保存映射的方法
		protected Pattern pattern;
		protected Map<String, Integer> paramIndexMapping; // 参数顺序
		/*
		 * 构造方法
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
			// 提取方法中加了注解的参数
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
			// 提取方法中的request和response参数
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
