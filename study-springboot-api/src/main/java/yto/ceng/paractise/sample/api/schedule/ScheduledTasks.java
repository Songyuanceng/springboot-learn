package yto.ceng.paractise.sample.api.schedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <pre>
 *  名称：ScheduledTasks
 *  描述：ScheduledTasks定时任务
 * </pre>
 *
 * @author Songyuancheng
 * @date 2019/1/21 16:59
 * @since v1.0.0
 */
@Component
public class ScheduledTasks {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Scheduled(fixedRate = 5000)
    public void printConcurrentTime() {
        LOGGER.info("This time is now {}", dateFormat.format(new Date()));
    }
}
