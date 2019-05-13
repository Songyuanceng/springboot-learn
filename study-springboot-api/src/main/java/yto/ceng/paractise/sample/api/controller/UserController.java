package yto.ceng.paractise.sample.api.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.Assert;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import springfox.documentation.annotations.ApiIgnore;
import yto.ceng.paractise.sample.common.exception.define.MyException;
import yto.ceng.paractise.sample.common.utils.MD5Utils;
import yto.ceng.paractise.sample.model.User;
import yto.ceng.paractise.sample.model.dto.UserDto;
import yto.ceng.paractise.sample.model.response.DataResult;
import yto.ceng.paractise.sample.service.UserService;

import javax.validation.Valid;
import java.util.Date;

/**
 * <pre>
 *  名称：UserController
 *  描述：用户controller
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 18:32
 * @since v1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add",method = RequestMethod.POST)
    @ApiOperation(value = "添加用户信息", notes = "添加用户信息")
    @ApiImplicitParam(name = "userDto",value = "用户信息", required = true,dataType = "UserDto")
    public DataResult addUser(@RequestBody @Valid UserDto userDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return DataResult.fail(bindingResult.getFieldError().getDefaultMessage());
        }
        User user = userDto.ConvertToUser();
        String date = DateFormatUtils.format(new Date(), "yyyy-MM-dd hh:mm:ss");
        user.setCreateTime(date);
        user.setUpdateTime(date);

        //对密码进行MD5加密
        user.setPassword(MD5Utils.md5Big(user.getPassword()));
        insert(user);
        Boolean aBoolean = userService.addUser(user);
        if (aBoolean){
            return DataResult.ok(userDto.convertFor(user));
        } else {
            return DataResult.fail("插入失败");
        }

        //lombok的建造者模式
        //User zhang = User.builder().age(18).username("zhang").build();
    }


    public void insert(User user){
        Assert.notNull(user,"用户信息不能为空"); //断言
        System.out.println(user.getUsername() + "--" + user.getAge());
    }


    @RequestMapping(value = "/query",method = RequestMethod.POST)
    @ApiOperation(value = "查询用户信息", notes = "根据用户名查询用户信息")
    @ApiImplicitParam(name = "userDto", value = "用户信息", required = true, dataType = "UserDto")
    public DataResult<UserDto> queryUserInfo(@RequestBody @Valid UserDto userDto,BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return DataResult.fail(bindingResult.getFieldError().getDefaultMessage());
        }
        User user = userDto.ConvertToUser();
        User resultUser = userService.queryUserInfo(user);
        UserDto userDto1 = userDto.convertFor(resultUser);
        return DataResult.ok(userDto1);
    }

    @RequestMapping("/index")
    @ApiIgnore//不用生成api
    public String index(ModelMap map){
        map.addAttribute("host","if you don't know how this is?please,search:www.baidu.com");
        return "index";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    @ApiOperation(value = "删除用户信息", notes = "删除用户")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id",value = "用户id",required = true,dataType = "Long"),
            @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String")})
    public String deleteUser(Long id, String username){
        String str = username + id.toString();
        return "success";

    }

    /**
     * 测试全局异常
     * @throws Exception
     */
    @ApiIgnore
    @ResponseBody
    @RequestMapping(value = "/hello")
    public String hello() {
        return userService.delete();
        //userService.delete();
    }

    /**
     * 测试全局异常之自定义异常
     * @throws MyException
     */
    @RequestMapping(value = "/test")
    @ApiIgnore
    public void testMyException() throws MyException {
        throw new MyException("未知错误");
    }

    @RequestMapping(value = "/freemarker")
    @ApiIgnore
    public ModelAndView test(){
        ModelAndView mv = new ModelAndView();
        mv.addObject("name", "freemarker");
        mv.setViewName("test");
        return mv;
    }
}
