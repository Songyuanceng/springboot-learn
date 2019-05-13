package yto.ceng.paractise.sample.api.controller;

import org.springframework.beans.BeanUtils;
import yto.ceng.paractise.sample.common.utils.MD5Utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Scanner;

/**
 * <pre>
 *  名称：
 *  描述：
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/31 9:37
 * @since v1.0.0
 */
public class Practise {
    public static void main(String[] args) throws FileNotFoundException {
        //Scanner s = new Scanner("123 asdf sd 45 789 sdf asdfl,sdf.sdfl,asdf    ......asdfkl    las");
        //s.useDelimiter(" |,|\\.");
        //while (s.hasNext()) {
            //System.out.println(s.next());
        //}

        //scanner扫描文本,逐行输出
        /*InputStream in = new FileInputStream("E:\\study-springboot-sample\\study-springboot-api\\src\\main\\resources\\templates\\studyjs\\demo.html");
        Scanner s = new Scanner(in);
        while (s.hasNextLine()) {
            System.out.println(s.nextLine());
        }*/

        /*Demo2 demo2 = Demo2.builder().name("zhangsan").id(123L).age(18).sex("man").address("xian").build();
        Demo demo = Demo.builder().build();
        BeanUtils.copyProperties(demo2,demo);
        System.out.println(demo2.getName() + "-" + demo2.getAge() + "-" + demo2.getId());
        System.out.println(demo.getName() + "-" + demo.getAge() + "-" + demo.getId());*/

        String s = MD5Utils.md5Big("{\"version\":\"2.0\",\"senderCode\":\"N411ISS\",\"tradeName\":\"上海圆通国际货代有限责任公司\",\"transCode\":\"C302\",\"sendTime\":\"20130610135030\",\"wDeliveryResponse\":[{\"deliveryCode\":\"201918271766\",\"billNo\":\"8888888888\",\"rspCode\":\"B025\",\"rspMsg\":\"成功入库\"}]}".concat("57y18A27I7v7dXb8474nA6Y1L19WwW3d"));
        System.out.println(s);
    }
}
