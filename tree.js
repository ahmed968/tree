function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const queue = new PriorityQueue((a, b) => distances[a] - distances[b]);
  
    // Initialize the distances object with infinite values for all vertices except the start vertex
    for (const vertex in graph) {
      if (vertex !== start) {
        distances[vertex] = Infinity;
      } else {
        distances[vertex] = 0;
      }
      queue.enqueue(vertex);
    }
  
    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      if (!visited.has(current)) {
        visited.add(current);
  
        for (const neighbor in graph[current]) {
          const distance = distances[current] + graph[current][neighbor];
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
            queue.enqueue(neighbor);
          }
        }
      }
    }
  
    return distances;
  }
  
  // PriorityQueue class implementation
  class PriorityQueue {
    constructor(comparator) {
      this.elements = [];
      this.comparator = comparator || ((a, b) => a - b);
    }
  
    enqueue(element) {
      this.elements.push(element);
      this.bubbleUp(this.elements.length - 1);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return undefined;
      }
  
      const min = this.elements[0];
      const last = this.elements.pop();
      if (this.elements.length > 0 && this.comparator(last, this.elements[0]) < 0) {
        this.elements[0] = last;
        this.bubbleDown(0);
      }
  
      return min;
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.comparator(this.elements[parentIndex], this.elements[index]) <= 0) {
          break;
        }
        [this.elements[parentIndex], this.elements[index]] = [
          this.elements[index],
          this.elements[parentIndex],
        ];
        index = parentIndex;
      }
    }
  
   