import { INPUT_9 } from "@/src/9/input";

const input = INPUT_9;

type FileBlocksById = {
  [id: string]: number[];
};

const getCompactedFileSystem = (): FileBlocksById => {
  const freeSpaceBlocks: number[] = [];
  const fileSystem: FileBlocksById = {};

  let isFreeSpaceBlock = false;
  let index = 0;

  // Initialize the file system
  for (const char of input) {
    let num = parseInt(char);

    if (num === 0) {
      isFreeSpaceBlock = false;
      continue;
    }

    const id = isFreeSpaceBlock ? undefined : Object.keys(fileSystem).length;

    while (num > 0) {
      if (isFreeSpaceBlock) {
        freeSpaceBlocks.push(index);
      } else {
        if (!fileSystem[id!]) {
          fileSystem[id!] = [];
        }

        fileSystem[id!].push(index);
      }

      num--;
      index++;
    }

    isFreeSpaceBlock = !isFreeSpaceBlock;
  }

  const fileSystemKeys = Object.keys(fileSystem).sort(
    (a, b) => parseInt(a) - parseInt(b),
  );

  let fileSystemKey = fileSystemKeys.pop();
  let freeSpaceBlock = freeSpaceBlocks.shift();
  while (true) {
    if (!fileSystemKey || !freeSpaceBlock) break;

    const indices = fileSystem[fileSystemKey];

    if (indices[indices.length - 1] < freeSpaceBlock) {
      fileSystemKey = fileSystemKeys.pop();
      continue;
    }

    if (!fileSystemKey || !freeSpaceBlock) break;

    fileSystem[fileSystemKey].pop();
    fileSystem[fileSystemKey].unshift(freeSpaceBlock);
    freeSpaceBlock = freeSpaceBlocks.shift();
  }

  return fileSystem;
};

const compactedFileSystem = getCompactedFileSystem();

const calculateChecksum = (): number => {
  let checksum = 0;

  for (const key in compactedFileSystem) {
    for (const index of compactedFileSystem[key]) {
      checksum += parseInt(key) * index;
    }
  }

  return checksum;
};

console.log(calculateChecksum());
