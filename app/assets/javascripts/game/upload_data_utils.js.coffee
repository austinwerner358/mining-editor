# NOTE:
window.getFiles = ->
  console.log("getFiles called...")
  fileSelectors = document.querySelectorAll('input.localWorldSelector')
  if fileSelectors
    [].forEach.call fileSelectors, (fileSelector) ->
      console.log("Setting onchange for selector: " + fileSelector)
      fileSelector.onchange = ->
        window.localFiles = {}
        window.settings.local = true
        console.log(settings.local)
        # Send message if File APIs are no longer supported.
        if !(window.File and window.FileReader and window.FileList and window.Blob)
          alert 'Local file API not supported in this browser.'
          return
        ul = document.getElementById("selectedFiles")
        [].slice.call(@files).forEach (file) ->
          console.log(file)
          window.localFiles[file.name] = file
          li = document.createElement("li")
          li.appendChild(document.createTextNode(file.name))
          ul.appendChild(li)
          return
        return
      return

window.handleRegionFiles = ->
  console.log("Reading region files...")
  regionFileElement = document.getElementById('regionFileSelector')
  message = ''
  if 'files' of regionFileElement
    if regionFileElement.files.length == 0
      message = 'Please select one or more files.'
    else
      # Reset local file objects.
      window.localFiles = {}
      for region, i in regionFileElement.files
        file = regionFileElement.files[i]
        if 'name' of file
          message += 'name: ' + file.name + '<br>'
        if 'size' of file
          message += 'size: ' + file.size + ' bytes <br>'
        console.log(file)
        window.localFiles[file.name] = file
  else
    if regionFileElement.value == ''
      message += 'Select one or more files.'
    else
      message += 'The files property is not supported by your browser!'
      # If the files property is not supported by the browser, the value is set to the path.
      message += '<br>The path of the selected file: ' + regionFileElement.value
  document.getElementById('selectedFiles').innerHTML = message
  return
