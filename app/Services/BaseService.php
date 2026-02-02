<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Spatie\LaravelData\Data;

/**
 * @template TModel of Model
 * @template TData of Data
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
     * Get the data class name.
     *
     * @return class-string<TData>
     */
    abstract protected function dataClass(): string;

    /**
     * Store a new record.
     *
     * @return TData
     */
    public function store(array $data): Data
    {
        return DB::transaction(function () use ($data): Data {
            $this->beforeStore($data);

            $modelClass = $this->model();
            $model = $modelClass::create($data);

            $this->afterStore($model, $data);

            $dataClass = $this->dataClass();

            return $dataClass::from($model);
        });
    }

    /**
     * Update an existing record.
     *
     * @param  TModel  $model
     * @return TData
     */
    public function update(Model $model, array $data): Data
    {
        return DB::transaction(function () use ($model, $data): Data {
            $this->beforeUpdate($model, $data);

            $model->update($data);

            $this->afterUpdate($model, $data);

            $dataClass = $this->dataClass();

            return $dataClass::from($model);
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
