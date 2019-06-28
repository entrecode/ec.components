import React, { useState } from 'react';
import Graph from 'react-graph-vis';

const allPackages = {
  data: {
    color: '#AB4B43',
  },
  ui: {
    color: 'green',
  },
  optional: {
    color: 'gray',
  },
  calendar: {
    color: 'darkblue',
  },
  modules: {
    color: 'black',
  },
};
const typeShapes = {
  component: 'box',
  module: 'ellipse',
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
  { label: 'ec-default-entry-input', package: 'data', type: 'component' },
  { label: 'ec-resource-delete-pop', package: 'data', type: 'component' },
  { label: 'ec-asset-select', package: 'data', type: 'component' },
  { label: 'ec-select', package: 'ui', type: 'component' },
  { label: 'ec-actionbar', package: 'ui', type: 'component' },
  { label: 'ec-form', package: 'ui', type: 'component' },
  { label: 'ec-input', package: 'ui', type: 'component' },
  { label: 'ec-default-input', package: 'ui', type: 'component' },
  { label: 'ec-default-output', package: 'ui', type: 'component' },
  { label: 'ec-input-errors', package: 'ui', type: 'component' },
  { label: 'ec-datetime', package: 'calendar', type: 'component' },
  { label: 'ec-calendar', package: 'calendar', type: 'component' },
  { label: 'ec-month', package: 'calendar', type: 'component' },
  { label: 'ec-daterange', package: 'calendar', type: 'component' },
  { label: 'ec-heatmap', package: 'calendar', type: 'component' },
  { label: 'ec-dynamic-slot', package: 'ui', type: 'component' },
  { label: 'ec-loader', package: 'ui', type: 'component' },
  { label: 'ec-output', package: 'ui', type: 'component' },
  { label: 'ec-pop', package: 'ui', type: 'component' },
  { label: 'ec-modal', package: 'ui', type: 'component' },
  { label: 'ec-location-picker', package: 'optional', type: 'component' },
  { label: 'ec-ace', package: 'optional', type: 'component' },
  { label: 'ec-toggle', package: 'ui', type: 'component' },
  { label: 'ec-login', package: 'data', type: 'component' },
  { label: 'ec-password-reset', package: 'data', type: 'component' },
  { label: 'ecEntry', package: 'data', type: 'directive' },
  { label: 'ecEntries', package: 'data', type: 'directive' },
  { label: 'ecAsset', package: 'data', type: 'directive' },
  { label: 'ec-asset-list-pop', package: 'data', type: 'component' },
  { label: 'ec-asset-select', package: 'data', type: 'component' },
  { label: 'ec-searchbar', package: 'data', type: 'component' },
  { label: 'ec-upload-select', package: 'data', type: 'component' },
  { label: 'ec-assetgroup-select', package: 'data', type: 'component' },
  { label: 'ecDropzone', package: 'data', type: 'component' },
  { label: 'ecImage', package: 'data', type: 'component' },
  { label: 'ecImage', package: 'data', type: 'component' },
  { label: 'ec-image-select-pop', package: 'data', type: 'component' },
  { label: 'FilesModule', package: 'modules', type: 'module' },
  { label: 'DataModule', package: 'modules', type: 'module' },
  { label: 'UiModule', package: 'modules', type: 'module' },
  { label: 'SdkModule', package: 'modules', type: 'module' },
  { label: 'AuthModule', package: 'modules', type: 'module' },
  { label: 'ResourceModule', package: 'modules', type: 'module' },
  { label: 'UtilityModule', package: 'modules', type: 'module' },
  { label: 'PopModule', package: 'modules', type: 'module' },
  { label: 'NotificationsModule', package: 'modules', type: 'module' },
  { label: 'LoaderModule', package: 'modules', type: 'module' },
  { label: 'ListModule', package: 'modules', type: 'module' },
  { label: 'FormModule', package: 'modules', type: 'module' },
  { label: 'SelectModule', package: 'modules', type: 'module' },
  { label: 'IconModule', package: 'modules', type: 'module' },
  { label: 'SymbolModule', package: 'modules', type: 'module' },

  { label: 'ec-tabs', package: 'ui', type: 'component' },
  { label: 'ec-tab', package: 'ui', type: 'component' },
  { label: 'ec-menu', package: 'ui', type: 'component' },
  { label: 'ec-login-form', package: 'ui', type: 'component' },
  { label: 'ec-signup-form', package: 'ui', type: 'component' },
  { label: 'ecFocus', package: 'ui', type: 'component' },
  { label: 'KeycommandsService', package: 'ui', type: 'service' },
  { label: 'PopService', package: 'ui', type: 'service' },
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
  { from: 'ec-datetime', to: 'ec-calendar' },
  { from: 'ec-calendar', to: 'ec-month' },
  { from: 'ec-daterange', to: 'ec-calendar' },
  { from: 'ec-heatmap', to: 'ec-calendar' },
  { from: 'ec-login', to: 'ec-login-form' },
  { from: 'ec-signup-form', to: 'ec-login-form' },
  { from: 'ec-signup', to: 'ec-signup-form' },
  { from: 'DataModule', to: 'FilesModule' },
  { from: 'DataModule', to: 'ec-crud' },
  { from: 'FilesModule', to: 'ec-asset-list-pop' },
  { from: 'FilesModule', to: 'ec-asset-select' },
  { from: 'FilesModule', to: 'ec-image-select-pop' },
  { from: 'ec-asset-list-pop', to: 'ec-resource-list' },
  { from: 'ec-asset-list-pop', to: 'ec-resource-select' },
  { from: 'ec-asset-list-pop', to: 'ec-pagination' },
  { from: 'ec-asset-list-pop', to: 'ec-select' },
  { from: 'ec-asset-list-pop', to: 'ec-searchbar' },
  { from: 'ec-asset-list-pop', to: 'ec-upload-select' },
  { from: 'ec-asset-select', to: 'ec-upload-select' },
  { from: 'ec-asset-select', to: 'ec-select' },
  { from: 'ec-image-select-pop', to: 'ec-pop' },
  { from: 'ec-image-select-pop', to: 'ec-form' },
  { from: 'ec-image-select-pop', to: 'ec-asset-select' },
  { from: 'DataModule', to: 'ec-entry-list' },
  { from: 'DataModule', to: 'ecEntry' },
  { from: 'DataModule', to: 'ecEntries' },
  { from: 'DataModule', to: 'ec-entry-form' },
  { from: 'DataModule', to: 'ec-entry-pop' },
  { from: 'DataModule', to: 'ec-default-entry-input' },
  /* { from: 'DataModule', to: 'ec-default-entry-output' }, */
  /* { from: 'DataModule', to: 'ec-admin-entry-input' }, */
  { from: 'DataModule', to: 'ec-entry-list-select' },
  { from: 'DataModule', to: 'ec-crud' },
  { from: 'DataModule', to: 'ec-entry-select' },
  { from: 'DataModule', to: 'ec-entry-actionbar' },
  { from: 'DataModule', to: 'ec-entry-list-pop' },
  { from: 'DataModule', to: 'UiModule' },
  { from: 'DataModule', to: 'SdkModule' },
  { from: 'DataModule', to: 'FilesModule' },
  { from: 'DataModule', to: 'AuthModule' },
  { from: 'DataModule', to: 'ResourceModule' },
  { from: 'UiModule', to: 'UtilityModule' },
  { from: 'UiModule', to: 'PopModule' },
  { from: 'UiModule', to: 'NotificationsModule' },
  { from: 'UiModule', to: 'LoaderModule' },
  { from: 'UiModule', to: 'ListModule' },
  { from: 'UiModule', to: 'FormModule' },
  { from: 'UiModule', to: 'SelectModule' },
  { from: 'UiModule', to: 'IconModule' },
  { from: 'UiModule', to: 'SymbolModule' },

  { from: 'UtilityModule', to: 'ec-tabs' },
  { from: 'UtilityModule', to: 'ec-tab' },
  { from: 'UtilityModule', to: 'ec-menu' },
  { from: 'UtilityModule', to: 'ec-login-form' },
  { from: 'UtilityModule', to: 'ec-signup-form' },
  { from: 'UtilityModule', to: 'ecFocus' },
  { from: 'UtilityModule', to: 'KeycommandsService' },

  { from: 'PopModule', to: 'ec-pop' },
  { from: 'PopModule', to: 'ec-modal' },
  { from: 'PopModule', to: 'PopService' },
];

const getChildren = (label) => {
  return allEdges
    .filter((e) => e.from === label)
    .map((e) => e.to)
    .map((c) => allNodes.find((n) => n.label === c));
};
const getParents = (label) => {
  return allEdges
    .filter((e) => e.to === label)
    .map((e) => e.from)
    .map((c) => allNodes.find((n) => n.label === c));
};

export const ComponentsOverview = ({ visibleNodes, levels, showCheckboxes, width, height, visiblePackages }) => {
  [width, height] = [width || 800, height || 600];
  const [packages, setPackages] = useState(Object.keys(allPackages));
  if (visiblePackages) {
    console.log('visible', visiblePackages);
    visibleNodes = allNodes.filter((n) => visiblePackages.includes(n.package)).map((n) => n.label);
  }
  if (levels && visibleNodes) {
    console.log('chlidrenOnly', visibleNodes);

    visibleNodes = visibleNodes.reduce((visible, current) => {
      return visible.concat(getChildren(current).map((n) => n.label));
    }, []);
    console.log('visible', visibleNodes);
  }
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
    const toActivate = getChildren(currentNode.label).concat([currentNode]);
    const toDeactivate = getParents(currentNode.label);
    console.log('children', toActivate);
    console.log('parents', toDeactivate);

    const activated = activeNodes
      .concat(toActivate)
      /* .filter((n) => !toDeactivate.map((n) => n.label).includes(n.label)) */
      .filter((n, i, a) => a.indexOf(n) === i);
    setActiveNodes(activated);
  };
  const nodes = allNodes
    .filter((n) => packages.includes(n.package))
    .filter((n) => !!activeNodes.find((a) => a.label === n.label))
    .map((n, id) => ({
      ...n,
      id,
      color: (allPackages[n.package] ? allPackages[n.package].color : 'red') || 'white',
      shape: typeShapes[n.type] || 'box',
      font: { color: 'white' },
      size: 10,
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
        gravitationalConstant: -4000,
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
          {Object.keys(allPackages).map((p, i) => (
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
