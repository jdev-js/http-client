import useGlobalConfig from './use-global-config'

export default function useBaseURL() {
  const { changeConfig, config } = useGlobalConfig()
  const changeBaseURL = (newBaseURL) => {
    changeConfig((config, setConfig) => {
      setConfig({
        ...config,
        baseURL: newBaseURL,
      })
    })
  }

  return { url: config.baseURL, changeBaseURL }
}
