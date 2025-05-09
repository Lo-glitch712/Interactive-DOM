let selectedNode = null;
let parentCount = 2;
let childCount = 4;

function bindNodeClickEvents() {
  document.querySelectorAll('.node').forEach(node => {
    node.onclick = function (e) {
      e.stopPropagation();
      if (selectedNode) selectedNode.classList.remove('highlight');
      selectedNode = this;
      selectedNode.classList.add('highlight');
    };
  });
}

function traverseUp() {
  if (!selectedNode || !selectedNode.parentElement.classList.contains('node')) return;
  selectNewNode(selectedNode.parentElement);
}

function traverseDown() {
  if (!selectedNode) return;
  const child = Array.from(selectedNode.children).find(el => el.classList.contains('node'));
  if (child) selectNewNode(child);
}

function traverseNext() {
  if (!selectedNode) return;
  let next = selectedNode.nextElementSibling;
  while (next && !next.classList.contains('node')) {
    next = next.nextElementSibling;
  }
  if (next) selectNewNode(next);
}

function traversePrev() {
  if (!selectedNode) return;
  let prev = selectedNode.previousElementSibling;
  while (prev && !prev.classList.contains('node')) {
    prev = prev.previousElementSibling;
  }
  if (prev) selectNewNode(prev);
}

function addChild() {
  if (!selectedNode) return;

  if (selectedNode.classList.contains('child')) {
    alert("Cannot add a child to a child node.");
    return;
  }

  if (selectedNode.classList.contains('grandparent')) {
    parentCount++;
    const newParent = document.createElement('div');
    newParent.className = 'node parent';
    newParent.textContent = `Parent ${parentCount}`;

    childCount++;
    const child1 = document.createElement('div');
    child1.className = 'node child';
    child1.textContent = `Child ${childCount}`;

    childCount++;
    const child2 = document.createElement('div');
    child2.className = 'node child';
    child2.textContent = `Child ${childCount}`;

    newParent.appendChild(child1);
    newParent.appendChild(child2);
    selectedNode.appendChild(newParent);
  } else if (selectedNode.classList.contains('parent')) {
    childCount++;
    const newChild = document.createElement('div');
    newChild.className = 'node child';
    newChild.textContent = `Child ${childCount}`;
    selectedNode.appendChild(newChild);
  }

  bindNodeClickEvents();
}

function deleteNode() {
  if (!selectedNode) return;
  if (selectedNode.id === 'grandparent') {
    alert("Cannot delete the grandparent node.");
    return;
  }

  const parent = selectedNode.parentElement;
  parent.removeChild(selectedNode);
  selectedNode = null;
  bindNodeClickEvents();
}

function selectNewNode(newNode) {
  if (selectedNode) selectedNode.classList.remove('highlight');
  selectedNode = newNode;
  selectedNode.classList.add('highlight');
}

bindNodeClickEvents();

const grandparentNode = document.getElementById('grandparent');
if (grandparentNode) {
  selectedNode = grandparentNode;
  selectedNode.classList.add('highlight');
}
