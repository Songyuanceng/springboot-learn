package yto.ceng.paractise.sample.common;

/**
 * <pre>
 *  名称：Converter
 *  描述：Converter转换bean
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/14 19:20
 * @since v1.0.0
 */
public interface Converter<S,T> {
    S doForward(T t);

    T doBackward(S s);
}
