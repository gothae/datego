package com.A104.dategoapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;

public class DateGoARModule extends ReactContextBaseJavaModule{
    private static ReactApplicationContext reactContext;
    ARModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext = reactContext;
    }
    @Override
    public String getName() {
        return "DateGoAR";  // 나중에 React Native에서 불러올 이름
    }
}