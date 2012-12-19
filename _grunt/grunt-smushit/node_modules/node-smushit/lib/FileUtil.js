var fs = require('fs');

exports.list = function(dir, options){
	options = options || {};
	dir = dir.replace(/(\/+)$/, '');
	var excludeFile = options.excludeFile,
		excludeDirectory = options.excludeDirectory,
		matchFunction = options.matchFunction,
		recursive = true,
		arr = [],
		root = fs.statSync(dir),
		p;
	if(!root.isDirectory()){
		return [];
	}

	p = fs.readdirSync(dir);
	if(options.recursive === false){
		recursive = false;
	}
	for(var i = 0, l = p.length; i<l; i++){
		var name = p[i],
			fullName = dir +"/"+ name,
			ss = fs.statSync(fullName),
			isDir = ss.isDirectory(),
			info = {
				directory: isDir,
				name: name,
				fullName: fullName
			};

		if(isDir){
			if(recursive){
				arr = arr.concat(this.list(fullName, options));
			}
			if(!excludeDirectory && (!matchFunction || (matchFunction && matchFunction(info)))){
				arr.push(info);
			}
		}else if(ss.isFile()){
			if(!excludeFile && (!matchFunction || (matchFunction && matchFunction(info)))){
				arr.push(info);
			}
		}
	}
	return arr;
}