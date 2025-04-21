Links:
- https://zarr.dev/blog/zarr-python-3-release/
- https://github.com/zarr-developers/zarr-specs/issues/227
- https://zarr-specs.readthedocs.io/en/latest/v3/core/v3.0.html
- https://zarr.readthedocs.io/en/latest/user-guide/arrays.html#sharding

# News in zarr-python v3:
- supports the complete zarr core v3 specification
- support for chunk-sharding extension
    - this allows to store multiple chunks in a single file (or object)
    - this allows the user to create much smaller chunks without raising the number of objects created
    - how does this work behind the scenes???
- improved performance
  - the i/o functionality was re-written to be asynchronous
  - for compute bound operations, zarr dispatches managed thread pool
- highly extensible
  - Store ABC
    - LocalStore
    - FsspecStore
    - ZipStore
  - Codec and CodecPipeline entrypoints
    - for custom compression and encoding strategies
- modernized codebase
  - 100% type hint coverage
  - enhanced public/private API definition
  - improved dev env, ci/cd

# Sharding
https://zarr.readthedocs.io/en/latest/user-guide/arrays.html#sharding

Shards are the units of writing, chunks are the units of reading.


# VirtualiZarr
https://virtualizarr.readthedocs.io/en/latest/

Provides abstraction over non-cloud native formats, at least NetCDF, to be read efficiently in a cloud environments.

Other related terms:
- kerchunk

# icechunk
- https://discourse.pangeo.io/t/pangeo-showcase-icechunk-an-open-source-transactional-storage-engine-for-zarr/4612
- https://icechunk.io/en/latest/overview/

Bringing transactions into action solves the issue with parallel reading and writing to the zarr dataset.

Replaces fsspec for manipulation of the data between object storage and zarr.

Implemented in Rust.

Enables multiplayer mode for shared zarr datasets in cloud.
- all updates occur with a transaction and create a new snapshot of the dataset
- serializable isolation between transactions, readers only ever see a committed snapshot
  - prevents conflicts between the changes to the data 
- no locks required for reading and writing data
- optimistic concurrency control for detecting and resolving write conflicts

Workflow
1. create icechunk store
2. manipulate with zarr dataset
3. commit the changes

Enables Data version control for zarr.
- snapshots
- branches
  - for prototyping some changes for one dataset, that might be actually used in production at the moment
  - mutable pointer to one of the snapshots
- tags
  - immutable pointer to one of the snapshots

Virtual datasets in Icechunk
- all chunks in icechunk are references
  - key, offset, size are tracked for every chunk
- integration with virtualizarr
- reading virtual datasets is indistinguishable from native datasets
- virtual datasets can be incrementally updated overwritten with native chunks