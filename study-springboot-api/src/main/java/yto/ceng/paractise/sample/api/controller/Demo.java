package yto.ceng.paractise.sample.api.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import yto.ceng.paractise.sample.common.utils.MD5Utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.NumberFormat;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * <pre>
 *  名称：Demo
 *  描述：
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/2/22 9:27
 * @since v1.0.0
 */
@Data
@Builder
public class Demo {
    private String name;

    private Long id;

    private Integer age;

    public static void main(String[] args) {
        /*double d = 0.09;
        String format = String.format("%.2f", d);
        System.out.println(format);*/
        String d = "58.86";
        Double aDouble = Double.parseDouble(d);
        System.out.println(aDouble);

//        NumberFormat nt = NumberFormat.getPercentInstance();
//        nt.setMaximumFractionDigits(2);
//        System.out.println(nt.format(20d/30));


//        System.out.println(new Date().getTime());
//        String format = DateFormatUtils.format(1552370195416L, "yyyy-MM-dd");
//        System.out.println(format);

//        List<Map<String, Object>> lists = new ArrayList<>();
//        HashMap<String, Object> map = new HashMap<>();
//        map.put("ebpName","米亚");
//        map.put("total", 10);
//        map.put("type", "I");
//
//        HashMap<String, Object> map2 = new HashMap<>();
//        map2.put("ebpName","米亚");
//        map2.put("total", 12);
//        map2.put("type", "E");
//
//        HashMap<String, Object> map3 = new HashMap<>();
//        map3.put("ebpName","圆通");
//        map3.put("total", 20);
//        map3.put("type", "I");
//
//        HashMap<String, Object> map4 = new HashMap<>();
//        map4.put("ebpName","中通");
//        map4.put("total", 30);
//        map4.put("type", "I");
//
//        lists.add(map);
//        lists.add(map2);
//        lists.add(map3);
//        lists.add(map4);
//        lists.add(map4);
//        lists.add(map4);
//        lists.add(map4);
//        lists.add(map);
//        lists.add(map4);
//
//        System.out.println(lists.size());

        //整合
//        int count = 0;
//        List<Map<String, Object>> maps = new ArrayList<>();
//        for (int x = 0; x < lists.size(); x++) {
//            HashMap<String, Object> result = new HashMap<>();
//            String ebpName = lists.get(x).get("ebpName").toString();
//            long total = Long.valueOf(lists.get(x).get("total").toString());
//            for (int y = 1; y < lists.size(); y++) {
//                String ebpName2 = lists.get(y).get("ebpName").toString();
//                if (ebpName.equals(ebpName2)) {
//                    total += Long.valueOf(lists.get(y).get("total").toString());
//                    lists.remove(y);
//                    y--;
//                }
//                count++;
//            }
//            lists.remove(x);
//            x--;
//            result.put(ebpName,total);
//            maps.add(result);
//            count++;
//        }
//        System.out.println(maps);
//        System.out.println(count);

        //去重整合
//        List<Map<String, Object>> maps = new ArrayList<>();
//        int count = 0;//循环次数
//        for (int x = 0; x < lists.size(); x++) {
//            HashMap<String, Object> result = new HashMap<>();
//            String ebpName = lists.get(x).get("ebpName").toString();
//            long total = Long.valueOf(lists.get(x).get("total").toString());
//            for (int y = x + 1; y < lists.size(); y++) { //y<lists.size() 不用再减1，因为lists.remove()执行后，lists长度自动减1
//                String ebpName2 = lists.get(y).get("ebpName").toString();
//                if (ebpName.equals(ebpName2)) {
//                    total += Long.valueOf(lists.get(y).get("total").toString());
//                    lists.remove(y);
//                    y--; //x在增大加1，lists长度在减1，那y也就的减1
//                }
//                count++;
//            }
//            result.put(ebpName,total);
//            maps.add(result);
//            count++;
//        }
//        long end = System.currentTimeMillis();
//        System.out.println(maps);
//        System.out.println(count);


        //冒泡排序
//        int[] arr = {1, 5, 3, 7, 2, 9};
//        for (int x = 0; x < arr.length; x++) {
//            System.out.println(arr[x]);
//        }
//        System.out.println("---------------");
//        for (int x = 0; x < arr.length - 1; x++) {
//            for (int y = 0; y < arr.length - 1 - x; y++) {
//                if (arr[y] > arr[y + 1]) {
//                    int temp = arr[y];
//                    arr[y] = arr[y + 1];
//                    arr[y + 1] = temp;
//                }
//            }
//        }
//        for (int x = 0; x < arr.length; x++) {
//            System.out.println(arr[x]);
//        }
    }

}
