package yto.ceng.paractise.sample.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * <pre>
 *  名称：ParactiseApplication
 *  描述：启动类入口
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/8 17:26
 * @since v1.0.0
 */
@SpringBootApplication(scanBasePackages ={"yto.ceng.paractise.sample"},exclude = {RedisAutoConfiguration.class})//排除springBoot自动给我们配置RedisAutoConfiguration
//@ImportResource(value = {"classpath:test-context.xml","classpath:another-context.xml"})//某些时候还是需要引入外部xml文件
//@ComponentScan(basePackages = "yto.ceng.paractise.index.html.dao")
@MapperScan(basePackages = {"yto.ceng.paractise.sample.dao"})//扫描DAO
@EnableScheduling//开启定时任务
@EnableSwagger2
public class ParactiseApplication {
    public static void main(String[] args) {
        SpringApplication.run(ParactiseApplication.class, args);
    }
}
