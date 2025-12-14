package com.callmehtatsu.pleasantweather;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        if (bridge != null) {
            bridge.setWebViewClient(new BridgeWebViewClient_Custom(bridge));
        }
    }
}
