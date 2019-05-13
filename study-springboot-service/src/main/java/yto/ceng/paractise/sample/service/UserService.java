package yto.ceng.paractise.sample.service;

import yto.ceng.paractise.sample.model.User;

/**
 * <pre>
 *  名称：UserService
 *  描述：UserService
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 18:40
 * @since v1.0.0
 */
public interface UserService {
    Boolean addUser(User user);

    User queryUserInfo(User user);

    String delete();
}
