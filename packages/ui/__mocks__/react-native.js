const ReactNativeMock = require('../../headless/jest/react-native-mock.js');

module.exports = {
	...ReactNativeMock,
	Touchable: {
		Mixin: {
			touchableHandleStartShouldSetResponder: () => false,
			touchableHandleResponderTerminationRequest: () => true,
			touchableHandleResponderGrant: () => {},
			touchableHandleResponderMove: () => {},
			touchableHandleResponderRelease: () => {},
			touchableHandleResponderTerminate: () => {},
			touchableGetInitialState: () => ({}),
		},
	},
};
