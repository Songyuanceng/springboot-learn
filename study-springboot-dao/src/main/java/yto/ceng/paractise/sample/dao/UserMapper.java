package yto.ceng.paractise.sample.dao;

import org.apache.ibatis.annotations.Param;
import yto.ceng.paractise.sample.model.User;

import java.util.List;
import java.util.Optional;

/**
 * <pre>
 *  名称：UserDao
 *  描述：UserDao
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 18:41
 * @since v1.0.0
 */
public interface UserMapper {

    int addUser(List<User> users);

    User queryUserInfo(@Param("username") String username);
}
