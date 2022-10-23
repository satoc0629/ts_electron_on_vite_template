import {spawn} from 'child_process'
import {createServer, build} from 'vite'

// ---- レンダリング処理部 ----
const server = await createServer({configFile: 'renderer/vite.config.ts'})
await server.listen()
console.log(`renderer process port:${server.config.server.port}`)

// ---- メインプロセス部 ----
const electronProcess = spawn("pnpm", ["--prefix", "electron_src/", "build"], {stdio: 'inherit'})
console.log(`electron process start.`)

electronProcess.on("open", () => {
    electronProcess.stderr.on('data', data => {
        console.error(data.toString())
    })
    electronProcess.stdout.on('data', data => {
        console.log(data.toString())
    })
})
