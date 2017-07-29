<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->

# cordova-plugin-snackbar


##MAJOR UPDATE Version 2.1.4:

This Update removes the need to manually modify the AndroidManifest.xml file to modify the App theme, the plugin will do that for you.

NOTE: You need to have Cordova 6.3.1 or higher to be able to do the modification automatically

## Installation

- Add the plugin:

    ```
    cordova plugin add cordova-plugin-snackbar

    phonegap plugin add cordova-plugin-snackbar
    ```

- Change the Main Activity theme to AppCompact (ONLY for users that use version older than Cordova 6.3.1):

####Before:

#####android:theme="@android:style/Theme.DeviceDefault.NoActionBar"

```
  <activity android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale" android:label="@string/activity_name" android:launchMode="singleTop" android:name="MainActivity" android:theme="@android:style/Theme.DeviceDefault.NoActionBar" android:windowSoftInputMode="adjustResize">
      <intent-filter android:label="@string/launcher_name">
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
  </activity>
```

####After:

#####android:theme="@style/Theme.AppCompat.NoActionBar"

```
<activity android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale" android:label="@string/activity_name" android:launchMode="singleTop" android:name="MainActivity" android:theme="@style/Theme.AppCompat.NoActionBar" android:windowSoftInputMode="adjustResize">
    <intent-filter android:label="@string/launcher_name">
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

## Usage

    cordova.plugins.snackbar(text, duration, button, callback);

    text // String text for the Snackbar

    duration  //How long to show the Snackbar
    parameters: "SHORT", "LONG" and "INDEFINITE" (default, show snackbar until it's dismissed by clicking the action button)

    button - String text for the Action Button

    callback - Callback function for the Action Button.

## Example

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        cordova.plugins.snackbar('This is a indefinite snackbar text', 'INDEFINITE', "Dismiss", function(){
          console.log('Dismiss Button Clicked');
        });
    }


### Supported Platforms

- Android

### Screenshot

<img src="https://github.com/echonox/cordova-plugin-snackbar/raw/master/Screenshot.png"></img>
