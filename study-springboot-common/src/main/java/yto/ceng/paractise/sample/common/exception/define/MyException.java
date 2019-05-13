package yto.ceng.paractise.sample.common.exception.define;

/**
 * <pre>
 *  名称：MyException
 *  描述：MyException自定义异常
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/21 15:51
 * @since v1.0.0
 */
public class MyException extends RuntimeException{
    public MyException(String message){
        super(message);
    }
}
