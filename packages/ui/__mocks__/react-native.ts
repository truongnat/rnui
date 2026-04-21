const ReactNative = jest.requireActual("react-native");

module.exports = {
	...ReactNative,
	Touchable: {
		Mixin: {},
	},
};
