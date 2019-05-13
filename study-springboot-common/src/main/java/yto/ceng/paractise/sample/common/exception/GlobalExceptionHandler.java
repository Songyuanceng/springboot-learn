package yto.ceng.paractise.sample.common.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import yto.ceng.paractise.sample.common.exception.define.MyException;
import yto.ceng.paractise.sample.common.exception.model.ErrorInfo;

import javax.servlet.http.HttpServletRequest;

/**
 * <pre>
 *  名称：GlobalExceptionHandler
 *  描述：全局异常处理之方式一
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/21 14:18
 * @since v1.0.0
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String DEFAULT_ERR_VIEW = "error";

    @ExceptionHandler(value = {Exception.class})
    public ModelAndView defaultErrorHandler(HttpServletRequest request, Exception e){
        ModelAndView mv = new ModelAndView();
        mv.addObject("exception",e);
        mv.addObject("url", request.getRequestURL());
        mv.setViewName(DEFAULT_ERR_VIEW);
        return mv;
    }

    @ExceptionHandler(value = MyException.class)
    @ResponseBody
    public ErrorInfo<Object> jsonErrorHandler(HttpServletRequest request, Exception e){
         return ErrorInfo.builder().code(ErrorInfo.OK).message(e.getMessage())
                .url(request.getRequestURL().toString()).data("some problems").build();
    }
}
