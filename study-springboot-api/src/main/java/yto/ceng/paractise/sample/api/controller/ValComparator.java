package yto.ceng.paractise.sample.api.controller;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import java.util.Comparator;
import java.util.Map;

/**
 * <pre>
 *  名称：ValComparator
 *  描述：自定义排序器
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/3/14 20:04
 * @since v1.0.0
 */
@Data
@Builder
@Accessors(chain = true)
public class ValComparator implements Comparator<Map<String, Object>> {

    private boolean flag;

    @Override
    public int compare(Map<String, Object> o1, Map<String, Object> o2) {
        int seq1 = 0;
        int seq2 = 0;
        try {
            seq1 = Integer.parseInt(o1.get("total").toString());
            seq2 = Integer.parseInt(o2.get("total").toString());
        } catch (Exception e) {
        }

        return flag ? seq2 - seq1 : seq1 - seq2;
    }
}
