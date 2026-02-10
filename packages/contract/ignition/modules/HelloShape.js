const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

module.exports = buildModule('HelloShapeModule', (m) => {
  const initialMessage = m.getParameter(
    'initialMessage',
    process.env.INITIAL_MESSAGE ?? 'Hello Shape',
  );

  const helloShape = m.contract('HelloShape', [initialMessage]);

  return { helloShape };
});
