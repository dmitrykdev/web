package org.devel.chat;

import java.util.List;

public interface MsgRepository {

	List<String> getMessages(int messageID);

	void addMessage(String message);

}
