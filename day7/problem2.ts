import fs from 'fs';
import path from 'path';

const testResult = fs.readFileSync(path.resolve(__dirname, './testData.text'), { encoding: 'utf-8', flag: 'r' });
const result = fs.readFileSync(path.resolve(__dirname, './data.text'), { encoding: 'utf8', flag: 'r' });
const lines = result.split(/\r?\n/);

/* 
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
*/

// Need to create a tree class in javascript
// https://www.30secondsofcode.org/articles/s/js-data-structures-tree

class Directory {
  name: string;
  parent: any;
  children: any[];

  constructor(name: string, parent: any) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }

  sumContents() {
    let total = 0;

    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] instanceof File) {
        total += this.children[i].size;
      } else {
        total += this.children[i].sumContents();
      }
    }

    return total;
  }
}

class File {
  name: string;
  size: number;
  parent: any;

  constructor(name: string, size: number, parent: any) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
}

let rootDirectory = new Directory('/', null);
let currentDirectory = rootDirectory;

lines.forEach((line) => {
  if (line.includes('$') && line.includes('cd') && line.includes('..')) {
    currentDirectory = currentDirectory.parent;
  } else if (line.includes('$') && line.includes('cd') && !line.includes('/')) {
    const changeDirectoryName = line.split(' ')[2];
    let children = currentDirectory.children;

    children.forEach((child) => {
      if (child instanceof Directory && child.name === changeDirectoryName) {
        currentDirectory = child;
      }
    });
  } else if (line.includes('dir')) {
    const directoryName = line.split(' ')[1];
    let newDirectory = new Directory(directoryName, currentDirectory);
    currentDirectory.children.push(newDirectory);
  } else if (!line.includes('$')) {
    const [size, name] = line.split(' ');
    let newFile = new File(name, Number(size), currentDirectory);
    currentDirectory.children.push(newFile);
  }
});

let resultArr: any[] = [];
let directory = rootDirectory;
let totalDirectorySize = directory.sumContents();
let spaceNeeded = Math.abs(70000000 - totalDirectorySize - 30000000);

resultArr.push({ name: directory.name, size: directory.sumContents() });

const addSumToResult = (children: any[], result: any[]) => {
  children.forEach((child) => {
    if (child instanceof Directory) {
      result.push({ name: child.name, size: child.sumContents() });
      if (child.children.length > 0) {
        addSumToResult(child.children, result);
      }
    }
  });

  return result;
};

const directorySizeSums = addSumToResult(directory.children, resultArr);
const directorySizeSumsSorted = directorySizeSums.sort((a, b) => a.size - b.size);

for (let i = 0; i < directorySizeSumsSorted.length; i++) {
  if (directorySizeSumsSorted[i].size > spaceNeeded) {
    console.log(directorySizeSumsSorted[i]);
    break;
  }
}

// const smallerDirectories = directorySizeSums.filter((sum) => sum < 100000);
// console.log(smallerDirectories.reduce((a, b) => a + b));
