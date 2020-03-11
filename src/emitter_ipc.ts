var ipc = require('node-ipc');

ipc.config.id = 'hello';
ipc.config.retry = 1500;
ipc.config.silent = true;

export const prepareBench = () => new Promise<void>((res) => {
    ipc.connectTo(
        'world',
        function () {
            ipc.of.world.on(
                'connect',
                function () {
                    res()
                }
            );
        }
    );
})

export const runBench = (N: number, msg: string) => new Promise(res => {
    let i = 0

    ipc.of.world.emit(
        'message',  //any event or message type your server listens for
        msg
    )

    ipc.of.world.on(
        'message',  //any event or message type your server listens for
        function (data: any) {
            if (++i > N) {
                i = 0
                res()
                return
            }
            ipc.of.world.emit(
                'message',  //any event or message type your server listens for
                msg
            )
        }
    );

})

export const close = () => ipc.disconnect('world')