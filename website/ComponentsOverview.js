import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Graph from 'react-graph-vis';

const getColor = (n) => '#' + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, '0');
const packageColors = {
  data: '#AB4B43',
  ui: 'green',
  optional: 'gray',
};
const typeShapes = {
  component: 'box',
  service: 'box',
};
const allNodes = [
  { label: 'ec-crud', package: 'data', type: 'component' },
  { label: 'ec-entry-list', package: 'data', type: 'component' },
  { label: 'ec-entry-list-pop', package: 'data', type: 'component' },
  { label: 'ec-resource-list', package: 'data', type: 'component' },
  { label: 'ec-resource-form', package: 'data', type: 'component' },
  { label: 'ec-list', package: 'ui', type: 'component' },
  { label: 'ec-list-header', package: 'ui', type: 'component' },
  { label: 'ec-list-items', package: 'ui', type: 'component' },
  { label: 'ec-pagination', package: 'ui', type: 'component' },
  { label: 'ec-entry-pop', package: 'data', type: 'component' },
  { label: 'ec-entry-form', package: 'data', type: 'component' },
  { label: 'ec-entry-select', package: 'data', type: 'component' },
  { label: 'ec-entry-list-select', package: 'data', type: 'component' },
  { label: 'ec-entry-actionbar', package: 'data', type: 'component' },
  { label: 'ec-select', package: 'ui', type: 'component' },
  { label: 'ec-actionbar', package: 'ui', type: 'component' },
  { label: 'ec-form', package: 'ui', type: 'component' },
  { label: 'ec-input', package: 'ui', type: 'component' },
  { label: 'ec-default-input', package: 'ui', type: 'component' },
  { label: 'ec-default-output', package: 'ui', type: 'component' },
  { label: 'ec-default-entry-input', package: 'data', type: 'component' },
  { label: 'ec-input-errors', package: 'ui', type: 'component' },
  { label: 'ec-datetime', package: 'ui', type: 'component' },
  { label: 'ec-dynamic-slot', package: 'ui', type: 'component' },
  { label: 'ec-output', package: 'ui', type: 'component' },
  { label: 'ec-pop', package: 'ui', type: 'component' },
  { label: 'ec-resource-delete-pop', package: 'data', type: 'component' },
  { label: 'ec-location-picker', package: 'optional', type: 'component' },
  { label: 'ec-ace', package: 'optional', type: 'component' },
  { label: 'ec-asset-select', package: 'data', type: 'component' },
  { label: 'ec-toggle', package: 'ui', type: 'component' },
];
const allEdges = [
  { from: 'ec-crud', to: 'ec-entry-list' },
  { from: 'ec-crud', to: 'ec-entry-pop' },
  { from: 'ec-entry-list', to: 'ec-resource-list' },
  { from: 'ec-resource-list', to: 'ec-list' },
  { from: 'ec-entry-pop', to: 'ec-entry-form' },
  { from: 'ec-entry-pop', to: 'ec-pop' },
  { from: 'ec-entry-pop', to: 'ec-resource-delete-pop' },
  { from: 'ec-entry-form', to: 'ec-form' },
  { from: 'ec-resource-form', to: 'ec-form' },
  { from: 'ec-entry-select', to: 'ec-entry-pop' },
  { from: 'ec-entry-select', to: 'ec-entry-list' },
  { from: 'ec-entry-select', to: 'ec-resource-delete-pop' },
  { from: 'ec-entry-select', to: 'ec-entry-list-pop' },
  { from: 'ec-entry-list-select', to: 'ec-input' },
  { from: 'ec-entry-list-select', to: 'ec-entry-list-pop' },
  { from: 'ec-entry-list-select', to: 'ec-entry-list' },
  { from: 'ec-entry-list-select', to: 'ec-entry-pop' },
  { from: 'ec-entry-actionbar', to: 'ec-actionbar' },
  { from: 'ec-actionbar', to: 'ec-select' },
  { from: 'ec-list', to: 'ec-list-header' },
  { from: 'ec-list-header', to: 'ec-form' },
  { from: 'ec-list-header', to: 'ec-input' },
  { from: 'ec-list-items', to: 'ec-output' },
  { from: 'ec-list', to: 'ec-list-items' },
  { from: 'ec-list', to: 'ec-pagination' },
  { from: 'ec-form', to: 'ec-input' },
  { from: 'ec-default-entry-input', to: 'ec-entry-select' },
  { from: 'ec-default-entry-input', to: 'ec-entry-actionbar' },
  { from: 'ec-default-entry-input', to: 'ec-input-errors' },
  { from: 'ec-default-entry-input', to: 'ec-entry-list-select' },
  { from: 'ec-default-entry-input', to: 'ec-asset-select' },
  { from: 'ec-default-entry-input', to: 'ec-output' },
  { from: 'ec-default-input', to: 'ec-datetime' },
  { from: 'ec-default-input', to: 'ec-toggle' },
  { from: 'ec-default-input', to: 'ec-input-errors' },
  { from: 'ec-input', to: 'ec-dynamic-slot' },
  { from: 'ec-input', to: 'ec-default-input' },
  { from: 'ec-input', to: 'ec-default-entry-input' },
  { from: 'ec-output', to: 'ec-dynamic-slot' },
  { from: 'ec-output', to: 'ec-default-output' },
  { from: 'ec-entry-select', to: 'ec-select' },
  { from: 'ec-select', to: 'ec-pop' },
  { from: 'ec-select', to: 'ec-list' },
  { from: 'ec-crud', to: 'ec-entry-list' },
];
const allPackages = ['data', 'ui', 'optional'];

export const ComponentsOverview = ({ visibleNodes, showCheckboxes, width, height }) => {
  [width, height] = [width || 800, height || 600];
  const [packages, setPackages] = useState(allPackages);
  const [activeNodes, setActiveNodes] = useState(
    allNodes.filter((n) => (visibleNodes || allNodes.map((n) => n.label)).includes(n.label)),
  );
  const togglePackage = (pkg) => {
    if (!packages.includes(pkg)) {
      setPackages(packages.concat([pkg]));
    } else {
      setPackages(packages.filter((p) => p !== pkg));
    }
  };
  const toggleNode = (nodeLabel) => {
    const currentNode = allNodes.find((n) => n.label === nodeLabel);

    const children = allEdges
      .filter((e) => e.from === currentNode.label)
      .map((e) => e.to)
      .concat([nodeLabel])
      .map((c) => allNodes.find((n) => n.label === c));
    const activated = activeNodes.concat(children.filter((n, i, a) => a.indexOf(n) === i));
    setActiveNodes(activated);
  };
  const nodes = allNodes
    .filter((n) => packages.includes(n.package))
    .filter((n) => !!activeNodes.find((a) => a.label === n.label))
    .map((n, id) => ({
      ...n,
      id,
      color: packageColors[n.package] || 'red',
      shape: typeShapes[n.type] || 'box',
      font: { color: 'white' },
      size: 150,
    }));

  const edges = allEdges
    .map((l, i) => ({
      from: nodes.find((n) => n.label === l.from),
      to: nodes.find((n) => n.label === l.to),
    }))
    .filter(({ from, to }) => from !== undefined && to !== undefined)
    .map(({ from, to }) => ({ from: from.id, to: to.id, width: 3 }));

  const options = {
    physics: {
      barnesHut: {
        damping: 0.5,
        springConstant: 0.01,
        avoidOverlap: 1,
        gravitationalConstant: -5000,
      },
      timestep: 0.2,
    },
    interaction: {
      zoomView: false,
    },
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
      smooth: {
        type: 'continuous',
      },
    },
    width: width + 'px',
    height: height + 'px',
  };
  console.log('options', options, width, height);

  const events = {
    select: function(e) {
      e.nodes.forEach((current) => {
        const currentNode = allNodes.find((n) => n.label === nodes[current].label);
        toggleNode(currentNode.label);
      }, []);
    },
  };
  const graph = {
    nodes,
    edges,
  };

  return (
    <>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          network.on('zoom', (e) => {});
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
      {!showCheckboxes || (
        <ul>
          {allPackages.map((p, i) => (
            <li key={i} style={{ listStyle: 'none' }}>
              <label>
                <input onChange={() => togglePackage(p)} type="checkbox" checked={packages.includes(p)} />
                {p}
              </label>
              <ul>
                {allNodes
                  .filter((n) => n.package === p)
                  .map((node, j) => (
                    <li key={i + ',' + j} style={{ listStyle: 'none' }}>
                      <label>
                        <input
                          onChange={() => toggleNode(node.label)}
                          type="checkbox"
                          checked={!!activeNodes.find((an) => an.label === node.label)}
                        />
                        {node.label}
                      </label>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
