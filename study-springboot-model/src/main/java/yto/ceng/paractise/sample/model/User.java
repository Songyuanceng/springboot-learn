package yto.ceng.paractise.sample.model;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <pre>
 *  名称：User
 *  描述：用户实体
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 17:56
 * @since v1.0.0
 */
@Data
//@AllArgsConstructor
//@NoArgsConstructor
@Accessors(chain=true) //链式编程。eg:new User.setUsername("zhang").setPassword("xxxx")
//@RequiredArgsConstructor//和@NonNull(属性上)配合使用
@Builder//建造者模式，加了这个注解，不能new了
public class User implements Serializable {
    private Long id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private int age;

    private String createTime;

    private String updateTime;

}
