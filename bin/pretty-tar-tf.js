#!/usr/bin/env node

/**
 * Pretty print data piped from tar -tf
 *
 *   tar -tf something.tgz | pretty-tar-tf
 *
 */

var stdin = process.openStdin()
var eol = require('os').EOL
var sep = require('path').sep
var data = []
var packageNames = {}
var otherFiles = {}


stdin.on('data', function onChunk (chunk) {
  var split = chunk.toString('utf8').split(eol)
  for (var i = 0; i < split.length; i++) {
    var line = split[i]
    if (line) {
      line = line.replace(/^package\//, '')
      var lineSplit = line.split(sep)
      if (lineSplit[0] === 'node_modules') {
        packageNames[lineSplit[1]] = null
      } else {
        var fileName = lineSplit.pop()
        var folderPath = lineSplit.join(sep)
        otherFiles[folderPath] = otherFiles[folderPath] || []
        otherFiles[folderPath].push(fileName)
      }
    }
  }
})

stdin.on('end', function onEnd () {
  console.log()
  var keys = []
  var key
  for (key in otherFiles) {
    keys.push(key)
  }
  keys.sort()
  var indent = ''
  for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    key = keys[keyIndex]
    var indent
    if (key) {
      indent = '  '
      console.log()
      console.log(key + sep)
    } else {
      indent = ''
    }

    var files = otherFiles[key]
    for (var filesIndex = 0; filesIndex < files.length; filesIndex++) {
      console.log(indent + files[filesIndex])
    }
  }

  var modules = []
  for (var key in packageNames) {
    modules.push('  ' + key)
  }
  if (modules.length) {
    console.log('\n\nnode_modules/')
    for (var moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      console.log(modules[moduleIndex])
    }
  }
})
