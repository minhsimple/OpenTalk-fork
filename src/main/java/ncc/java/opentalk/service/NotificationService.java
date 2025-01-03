package ncc.java.opentalk.service;

import ncc.java.opentalk.entity.User;

import java.util.concurrent.atomic.AtomicInteger;

public interface NotificationService {
    public void sendNotification(User receiver, String content);
    public String countSentNotifications();
    public String getNotificationsSent();
}
