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

  while (true) {
    if (!fileSystemKey) break;

    const indices = fileSystem[fileSystemKey];

    let countInOrder = 1;
    let prevFreeSpaceBlock = freeSpaceBlocks[0];
    let fromFreeSpaceBlockIndex = 0;
    for (let i = 1; i < freeSpaceBlocks.length; i++) {
      if (countInOrder === indices.length) {
        break;
      }

      if (freeSpaceBlocks[i] - freeSpaceBlocks[i - 1] === 1) {
        countInOrder++;
      } else {
        countInOrder = 1;
        prevFreeSpaceBlock = freeSpaceBlocks[i];
        fromFreeSpaceBlockIndex = i;
      }
    }

    if (prevFreeSpaceBlock > indices[0] || countInOrder !== indices.length) {
      fileSystemKey = fileSystemKeys.pop();
      continue;
    }

    fileSystem[fileSystemKey] = indices.map((_, i) => prevFreeSpaceBlock + i);
    freeSpaceBlocks.splice(fromFreeSpaceBlockIndex, indices.length);
    fileSystemKey = fileSystemKeys.pop();
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
