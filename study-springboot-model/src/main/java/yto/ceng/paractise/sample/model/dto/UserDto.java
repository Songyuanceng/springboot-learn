package yto.ceng.paractise.sample.model.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import yto.ceng.paractise.sample.common.Converter;
import yto.ceng.paractise.sample.model.User;

import javax.validation.constraints.*;

/**
 * <pre>
 *  名称：UserDto
 *  描述：User信息传输bean
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 18:36
 * @since v1.0.0
 */
@Data
@Builder
public class UserDto {
    @NotNull(message = "name字段不能为空")
    @NotBlank(message = "name字段不能为空")
    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String email;

    @Max(value = 100,message = "age超过最大数值")
    @Min(value = 1,message = "age设定不正确")
    private int age;

    private String createTime;

    private String updateTime;

    public User ConvertToUser(){
        UserDtoConverter userDtoConverter = new UserDtoConverter();
        User user = userDtoConverter.doForward(this);
        return user;
    }

    public UserDto convertFor(User user){
        UserDtoConverter userDtoConverter = new UserDtoConverter();
        UserDto userDto = userDtoConverter.doBackward(user);
        return userDto;
    }


    private static class UserDtoConverter implements Converter<User, UserDto> {


        @Override
        public User doForward(UserDto userDto) {
            User user = User.builder().build();
            BeanUtils.copyProperties(userDto, user);
            return user;
        }

        @Override
        public UserDto doBackward(User user) {
            //throw new AssertionError("不支持逆向转化方法!");不支持逆向转化时，抛出断言异常。
            UserDto userDto = UserDto.builder().build();
            BeanUtils.copyProperties(user, userDto);
            return userDto;
        }
    }
}
