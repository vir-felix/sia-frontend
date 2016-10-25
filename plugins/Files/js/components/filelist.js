import React, { PropTypes } from 'react'
import { List, Set } from 'immutable'
import File from './file.js'
import Path from 'path'
import SearchField from '../containers/searchfield.js'
import FileControls from '../containers/filecontrols.js'

const FileList = ({files, selected, searchResults, path, showSearchField, actions}) => {
	const onBackClick = () => {
		if (path === '') {
			return
		}
		let newpath = Path.posix.join(path, '../')
		if (newpath === './') {
			newpath = ''
		}
		actions.setPath(newpath)
	}

	let filelistFiles
	if (showSearchField) {
		filelistFiles = searchResults
	} else {
		filelistFiles = files
	}
	const fileElements = filelistFiles.map((file, key) => {
		const isSelected = selected.map((selectedfile) => selectedfile.name).includes(file.name)
		const onRenameClick = (e) => {
			e.stopPropagation()
			actions.showRenameDialog(file)
		}
		const onDownloadClick = (e) => {
			e.stopPropagation()
			const downloadpath = SiaAPI.openFile({
				title: 'Where should we download this file?',
				properties: ['openDirectory', 'createDirectories'],
			})
			if (downloadpath.length === 0) {
				// No files were selected, nop
				return
			}
			actions.downloadFile(file, Path.join(downloadpath[0], Path.basename(file.siapath)))
		}
		const onDeleteClick = (e) => {
			e.stopPropagation()
			actions.showDeleteDialog(List([file]))
		}
		const onFileClick = (e) => {
			if (!e.ctrlKey && !e.shiftKey) {
				actions.deselectAll()
			}
			if (e.shiftKey) {
				actions.selectUpTo(file)
			}
			if (e.ctrlKey && isSelected) {
				actions.deselectFile(file)
			} else {
				actions.selectFile(file)
			}
		}
		const onDoubleClick = (e) => {
			e.stopPropagation()
			if (file.type === 'directory') {
				actions.setPath(Path.posix.join(path, file.name))
			}
		}
		return (
			<File
				key={key}
				selected={isSelected}
				filename={file.name}
				filesize={file.size}
				onDoubleClick={onDoubleClick}
				type={file.type}
				onRenameClick={onRenameClick}
				onClick={onFileClick}
				onDownloadClick={onDownloadClick}
				onDeleteClick={onDeleteClick}
			/>
		)
	})
	return (
		<div className="file-list">
			{showSearchField ? <SearchField /> : null}
			<ul>
				{path !== '' ? <li onClick={onBackClick}><div><i className="fa fa-backward" />Back</div></li> : null}
				{fileElements.size > 0 ? fileElements : (showSearchField ? <h2> No matching files </h2> : <h2> No files uploaded </h2>)}
			</ul>
			{selected.size > 0 ? <FileControls /> : null}
		</div>
	)
}

FileList.propTypes = {
	files: PropTypes.instanceOf(List),
	selected: PropTypes.instanceOf(Set).isRequired,
	searchResults: PropTypes.instanceOf(List),
	path: PropTypes.string.isRequired,
	showSearchField: PropTypes.bool.isRequired,
}

export default FileList
