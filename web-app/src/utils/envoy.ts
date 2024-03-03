export class Envoy {
    // eslint-disable-next-line class-methods-use-this
    protected effect: () => void = () => {};

    public on(e: () => void) {
        this.effect = e;
    }

    public call() {
        this.effect();
    }
}

export default Envoy;
