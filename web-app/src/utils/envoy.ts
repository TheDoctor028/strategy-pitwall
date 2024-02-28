export class Envoy {
    protected effect: () => void = () => {};

    public on(e: () => void) {
        this.effect = e;
    }

    public call() {
        this.effect()
    }
}
