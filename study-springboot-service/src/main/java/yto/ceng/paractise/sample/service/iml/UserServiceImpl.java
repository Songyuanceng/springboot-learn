package yto.ceng.paractise.sample.service.iml;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.stereotypes.ThreadSafe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yto.ceng.paractise.sample.common.exception.define.MyException;
import yto.ceng.paractise.sample.dao.UserMapper;
import yto.ceng.paractise.sample.model.User;
import yto.ceng.paractise.sample.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * <pre>
 *  名称：
 *  描述：
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 18:40
 * @since v1.0.0
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Boolean addUser(User user) {
        List<User> users = new ArrayList<>();
        users.add(user);
        if (userMapper.addUser(users) > 0) return true;
        return false;
    }

    @Override
    public User queryUserInfo(User user) {
        User userInfo = userMapper.queryUserInfo(user.getUsername());
        return userInfo != null? userInfo: User.builder().build();
    }

    @Override
    public String delete() {

        if (1==1) throw new MyException("发生算术异常,请处理");

        return null;
    }
}
