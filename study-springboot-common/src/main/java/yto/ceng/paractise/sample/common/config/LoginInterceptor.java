package yto.ceng.paractise.sample.common.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * <pre>
 *  名称：LoginInterceptor
 *  描述：自定义登陆LoginInterceptor
 *       众多拦截器组成一个拦截器链
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/21 11:29
 * @since v1.0.0
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginInterceptor.class);

    //
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        LOGGER.info("访问URI=" + requestURI);
        System.out.println("uri=" + requestURI);
        //
        if (requestURI.startsWith("/admin") || !requestURI.startsWith("/admin/login")){
            response.sendRedirect(request.getContextPath() + "/admin/login");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
