package yto.ceng.paractise.sample.model.response;

import lombok.Data;

import java.util.Date;

/**
 * <pre>
 *  名称：DataResult
 *  描述：返回结果封装
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/9 17:48
 * @since v1.0.0
 */
@Data
public class DataResult<T> extends BaseResponse<T>{

    public  static <T> DataResult ok(T t){
        DataResult dataResult = new DataResult<>();
        dataResult.setStatus("0");
        dataResult.setDate(new Date());
        dataResult.setMessage(t);
        dataResult.setResult("success");
        return dataResult;
    }

    public static <T> DataResult fail(T t){
        DataResult dataResult = new DataResult<>();
        dataResult.setStatus("1");
        dataResult.setDate(new Date());
        dataResult.setMessage(t);
        dataResult.setResult("failure");
        return dataResult;
    }
}
