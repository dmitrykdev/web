package org.devel.chat;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

@Repository
public class MemMsgRepository implements MsgRepository {

	private final List<String> messages = new CopyOnWriteArrayList<String>();

	public List<String> getMessages(int index) {
		if (this.messages.isEmpty()) {
			return Collections.<String> emptyList();
		}
		Assert.isTrue((index >= 0) && (index <= this.messages.size()), "bad message index");
		return this.messages.subList(index, this.messages.size());
	}

	public void addMessage(String message) {
		this.messages.add(message);
	}

}
