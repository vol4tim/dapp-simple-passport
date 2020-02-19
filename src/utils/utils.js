import axios from "axios";
import getIpfs, { cat as ipfsCat } from "../utils/ipfs";
import rosBag, { getRosbag } from "./rosBag";
import config from "../config";

export const genRosbagIpfs = data => {
  let bag;
  let hash;
  return getRosbag(data)
    .then(r => {
      bag = r;
      return getIpfs();
    })
    .then(ipfs => {
      return ipfs.add(bag);
    })
    .then(r => {
      hash = r[0].hash;
      return axios.get(`${config.IPFS_GATEWAY}${hash}`);
    })
    .then(() => {
      return hash;
    })
    .catch(e => {
      console.log(e);
    });
};

export const readRosbagIpfs = (hash, cb, topics = {}) => {
  return ipfsCat(hash).then(r => {
    return rosBag(new Blob([r]), cb, topics);
  });
};
