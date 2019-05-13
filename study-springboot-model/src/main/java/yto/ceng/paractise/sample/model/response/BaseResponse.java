package yto.ceng.paractise.sample.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * <pre>
 *  名称：BaseResponse
 *  描述：基础响应类
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/9 17:49
 * @since v1.0.0
 */
@Data
public class BaseResponse<T> {
    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date date;

    private T message;

    private String result;
}
