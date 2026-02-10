const { expect } = require('chai');

describe('HelloShape', function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const helloShapeFactory = await ethers.getContractFactory('HelloShape');
    const helloShape = await helloShapeFactory.deploy('Hello Shape');

    await helloShape.waitForDeployment();

    return { helloShape, owner, other };
  }

  it('sets constructor message', async function () {
    const { helloShape } = await deployFixture();

    expect(await helloShape.message()).to.equal('Hello Shape');
  });

  it('allows owner to update message', async function () {
    const { helloShape, owner } = await deployFixture();

    await expect(helloShape.connect(owner).setMessage('Updated')).to.emit(
      helloShape,
      'MessageUpdated',
    ).withArgs('Hello Shape', 'Updated', owner.address);

    expect(await helloShape.message()).to.equal('Updated');
  });

  it('rejects non-owner updates', async function () {
    const { helloShape, other } = await deployFixture();

    await expect(helloShape.connect(other).setMessage('Bad')).to.be.revertedWithCustomError(
      helloShape,
      'OwnableUnauthorizedAccount',
    ).withArgs(other.address);
  });

  it('rejects empty constructor message', async function () {
    const helloShapeFactory = await ethers.getContractFactory('HelloShape');

    await expect(helloShapeFactory.deploy('')).to.be.revertedWithCustomError(
      helloShapeFactory,
      'EmptyMessage',
    );
  });

  it('rejects empty message updates', async function () {
    const { helloShape } = await deployFixture();

    await expect(helloShape.setMessage('')).to.be.revertedWithCustomError(
      helloShape,
      'EmptyMessage',
    );
  });
});
