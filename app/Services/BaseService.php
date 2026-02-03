<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @template TModel of Model
 */
abstract class BaseService
{
    /**
     * Get the model class name.
     *
     * @return class-string<TModel>
     */
    abstract protected function model(): string;

    /**
     * Store a new record.
     *
     * @return TModel
     */
    public function store(array $data): Model
    {
        return DB::transaction(function () use ($data): Model {
            $this->beforeStore($data);

            $modelClass = $this->model();
            $model = $modelClass::create($data);

            $this->afterStore($model, $data);

            return $model;
        });
    }

    /**
     * Update an existing record.
     *
     * @param  TModel  $model
     * @return TModel
     */
    public function update(Model $model, array $data): Model
    {
        return DB::transaction(function () use ($model, $data): Model {
            $this->beforeUpdate($model, $data);

            $model->update($data);

            $this->afterUpdate($model, $data);

            return $model;
        });
    }

    /**
     * Delete a record.
     *
     * @param  TModel  $model
     */
    public function destroy(Model $model): void
    {
        DB::transaction(function () use ($model): void {
            $this->beforeDestroy($model);

            $model->delete();

            $this->afterDestroy();
        });
    }

    /**
     * Hook: Before storing a new record.
     */
    protected function beforeStore(array &$data): void
    {
        //
    }

    /**
     * Hook: After storing a new record.
     *
     * @param  TModel  $model
     */
    protected function afterStore(Model $model, array $data): void
    {
        //
    }

    /**
     * Hook: Before updating a record.
     *
     * @param  TModel  $model
     */
    protected function beforeUpdate(Model $model, array &$data): void
    {
        //
    }

    /**
     * Hook: After updating a record.
     *
     * @param  TModel  $model
     */
    protected function afterUpdate(Model $model, array $data): void
    {
        //
    }

    /**
     * Hook: Before deleting a record.
     *
     * @param  TModel  $model
     */
    protected function beforeDestroy(Model $model): void
    {
        //
    }

    /**
     * Hook: After deleting a record.
     */
    protected function afterDestroy(): void
    {
        //
    }
}
