package org.dom.mon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Base {
    private Object data;
    private boolean success;
    private String message;

    public Base(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public Base(Object data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }
}
