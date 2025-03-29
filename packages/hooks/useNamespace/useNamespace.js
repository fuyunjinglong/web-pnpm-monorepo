export const defaultNamespace = "lw";

export const useNamespace = (blocks) => {
  const namespace = defaultNamespace;

  const block = (blockSuffix) => {
    return _bem(namespace, blocks, blockSuffix, "", "", "");
  };

  const element = (element) =>
    element ? _bem(namespace, blocks, "", element, "", "") : "";

  const modifier = (modifier, value) =>
    modifier ? _bem(namespace, blocks, "", "", modifier, value) : "";

  const is = (activeName, active) =>
    activeName && active ? `is-${activeName}` : "";

  return {
    namespace,
    block,
    element,
    modifier,
    is,
  };
};

const _bem = (
  namespace,
  block,
  blockSuffix,
  element,
  modifier,
  modifierValue
) => {
  let cls = `${namespace}-${block}`;
  blockSuffix && (cls += `-${blockSuffix}`);
  element && (cls += `__${element}`);
  modifier && (cls += `--${modifier}`);
  modifierValue && (cls += `_${modifierValue}`);

  return cls;
};
