let config = {
  ipfs: {
    fallback: {
      repo: "ipfs/robonomics",
      relay: {
        enabled: true,
        hop: {
          enabled: true
        }
      },
      EXPERIMENTAL: {
        pubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
            "/dns4/1.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/",
            "/dns4/2.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/",
            "/dns4/3.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/"
          ]
        },
        Bootstrap: [
          // "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
          // "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
          // '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
          // '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
          "/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
          "/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6",
          "/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8",
          "/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9",
          "/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw",
          "/ip4/127.0.0.1/tcp/4002/ws/ipfs/QmZ7rFH5NodLFJCg18Ji6ur3wC3o5roFEeoQMffo3poXo6"
        ]
      }
    },
    cdn: "https://unpkg.com/ipfs@0.34.0/dist/index.min.js",
    permission: [
      "id",
      "files.cat",
      "files.add",
      "pubsub.peers",
      "pubsub.publish",
      "pubsub.subscribe",
      "swarm.peers",
      "swarm.connect"
    ]
  },
  statusPeers: [
    "QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8",
    "QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9",
    "QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw",
    "QmZ7rFH5NodLFJCg18Ji6ur3wC3o5roFEeoQMffo3poXo6"
  ]
};

export function setConfig({ ipfs, robonomics, statusPeers }) {
  config = {
    ipfs: {
      ...config.ipfs,
      ...ipfs
    },
    statusPeers: statusPeers || config.statusPeers,
    robonomics:
      robonomics ||
      function() {
        throw new Error("bad config");
      }
  };
}

export default function() {
  return config;
}
