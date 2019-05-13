package yto.ceng.paractise.sample.api.controller;

import com.alibaba.druid.util.Base64;
import lombok.Builder;
import lombok.Data;
import org.springframework.util.Base64Utils;

import java.util.*;

/**
 * <pre>
 *  名称：Demo2
 *  描述：
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/2/22 9:28
 * @since v1.0.0
 */
@Data
@Builder
public class Demo2 {
    private String name;

    private Long id;

    private Integer age;

    private String sex;

    private String address;


    public static void main(String[] args) {
        String string = Base64Utils.encodeToString("45Hiueoj45JOwlaojl14a45aDfTy89UT44Retyhr8UU=".getBytes());
        System.out.println(string);
    }

    public static void test() {
        List<Map<String, Object>> lists = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();
        map.put("ebpName","米亚");
        map.put("total", 10);
        map.put("type", "I");

        HashMap<String, Object> map3 = new HashMap<>();
        map3.put("ebpName","圆通");
        map3.put("total", 20);
        map3.put("type", "I");

        HashMap<String, Object> map4 = new HashMap<>();
        map4.put("ebpName","中通");
        map4.put("total", 30);
        map4.put("type", "I");
        lists.add(map);
        lists.add(map3);
        lists.add(map4);
        System.out.println(lists);

        ValComparator valComparator = ValComparator.builder().flag(false).build();
        Collections.sort(lists,valComparator);

        System.out.println(lists);
    }
}
