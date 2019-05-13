package yto.ceng.paractise.sample.common.exception.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
/**
 * <pre>
 *  名称：ErrorInfo
 *  描述：ErrorInfo错误信息
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/21 15:58
 * @since v1.0.0
 */
@Data
@Accessors(chain = true)
@Builder
//@NoArgsConstructor
public class ErrorInfo<T> {
    public static final Integer OK = 1;

    public static final Integer NO= 1;

    private Integer code;

    private String message;

    private String url;

    private T data;
}
